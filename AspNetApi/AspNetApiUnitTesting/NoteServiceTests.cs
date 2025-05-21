using Xunit;
using AspNetApi.Models;
using AspNetApi.Data;
using AspNetApi.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AspNetApiUnitTesting
{
    public class NoteServiceTests
    {
        private NoteService GetServiceWithDb(string dbName)
        {
            var options = new DbContextOptionsBuilder<NotesDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;
            var context = new NotesDbContext(options);
            return new NoteService(context);
        }

        [Fact]
        public void Add_Note_Should_Increase_Count()
        {
            var service = GetServiceWithDb(nameof(Add_Note_Should_Increase_Count));
            var note = new Note { Info1 = "A", Info2 = "B" };
            service.Add(note);
            Assert.Single(service.GetAll());
        }

        [Fact]
        public void GetAll_Should_Return_All_Notes()
        {
            var service = GetServiceWithDb(nameof(GetAll_Should_Return_All_Notes));
            service.Add(new Note { Info1 = "A", Info2 = "B" });
            service.Add(new Note { Info1 = "C", Info2 = "D" });
            Assert.Equal(2, service.GetAll().Count());
        }

        [Fact]
        public void GetById_Should_Return_Correct_Note()
        {
            var service = GetServiceWithDb(nameof(GetById_Should_Return_Correct_Note));
            var note = service.Add(new Note { Info1 = "A", Info2 = "B" });
            var found = service.GetById(note.Id);
            Assert.NotNull(found);
            Assert.Equal("A", found.Info1);
        }

        [Fact]
        public void GetById_Should_Return_Null_If_Not_Found()
        {
            var service = GetServiceWithDb(nameof(GetById_Should_Return_Null_If_Not_Found));
            Assert.Null(service.GetById(999));
        }

        [Fact]
        public void Update_Should_Modify_Note()
        {
            var service = GetServiceWithDb(nameof(Update_Should_Modify_Note));
            var note = service.Add(new Note { Info1 = "A", Info2 = "B" });
            var updated = new Note { Info1 = "X", Info2 = "Y" };
            var result = service.Update(note.Id, updated);
            Assert.True(result);
            var found = service.GetById(note.Id);
            Assert.Equal("X", found.Info1);
            Assert.Equal("Y", found.Info2);
        }

        [Fact]
        public void Update_Should_Return_False_If_Not_Found()
        {
            var service = GetServiceWithDb(nameof(Update_Should_Return_False_If_Not_Found));
            var updated = new Note { Info1 = "X", Info2 = "Y" };
            Assert.False(service.Update(999, updated));
        }

        [Fact]
        public void Delete_Should_Remove_Note()
        {
            var service = GetServiceWithDb(nameof(Delete_Should_Remove_Note));
            var note = service.Add(new Note { Info1 = "A", Info2 = "B" });
            var result = service.Delete(note.Id);
            Assert.True(result);
            Assert.Empty(service.GetAll());
        }

        [Fact]
        public void Delete_Should_Return_False_If_Not_Found()
        {
            var service = GetServiceWithDb(nameof(Delete_Should_Return_False_If_Not_Found));
            Assert.False(service.Delete(999));
        }

        [Fact]
        public void Add_Note_With_Empty_Info1_Should_Succeed_But_Validation_Should_Be_Handled_Elsewhere()
        {
            var service = GetServiceWithDb(nameof(Add_Note_With_Empty_Info1_Should_Succeed_But_Validation_Should_Be_Handled_Elsewhere));
            var note = new Note { Info1 = "", Info2 = "B" };
            service.Add(note);
            Assert.Single(service.GetAll());
        }

        [Fact]
        public void Add_Multiple_Notes_Should_Assign_Unique_Ids()
        {
            var service = GetServiceWithDb(nameof(Add_Multiple_Notes_Should_Assign_Unique_Ids));
            var n1 = service.Add(new Note { Info1 = "A", Info2 = "B" });
            var n2 = service.Add(new Note { Info1 = "C", Info2 = "D" });
            Assert.NotEqual(n1.Id, n2.Id);
        }
    }
} 